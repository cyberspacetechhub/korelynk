# Performance Optimization Guide

## Current Issues & Solutions

### 1. Reduce Unused JavaScript (340 KiB savings)

**Problem**: Large bundle size with unused code
**Solutions**:

#### A. Enable Tree Shaking in Vite
```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

#### B. Lazy Load Heavy Components
Already implemented but ensure all admin pages are lazy loaded.

#### C. Remove Unused Dependencies
Check package.json and remove:
- Unused icon imports from lucide-react
- Unused utility libraries

### 2. Minify JavaScript (6 KiB savings)

**Already configured in Vite** but ensure production build:
```bash
npm run build
```

### 3. Reduce Unused CSS (11 KiB savings)

**Problem**: Tailwind includes unused classes
**Solution**: Already configured in tailwind.config.js with purge

Verify purge paths include all files:
```js
// tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### 4. Image Width/Height Attributes

**Problem**: Images lack explicit dimensions causing layout shift
**Solution**: Add width/height to all images

Example fixes needed:
```jsx
// Portfolio.jsx - Tech stack logos
<img
  src={tech.logo}
  alt={`${tech.name} logo`}
  width="64"
  height="64"
  className="w-full h-full object-contain"
  loading="lazy"
/>

// Project images
<img
  src={project.image}
  alt={project.title}
  width="400"
  height="224"
  className="w-full h-56 object-cover"
  loading="lazy"
/>
```

### 5. Enormous Network Payload (9,010 KiB)

**Problem**: Large total download size
**Solutions**:

#### A. Image Optimization
- Convert images to WebP format
- Use responsive images with srcset
- Compress images (use TinyPNG or similar)

```jsx
<img
  src={project.image}
  srcSet={`${project.image}?w=400 400w, ${project.image}?w=800 800w`}
  sizes="(max-width: 768px) 400px, 800px"
  alt={project.title}
  width="400"
  height="224"
  loading="lazy"
  decoding="async"
/>
```

#### B. Code Splitting
Already implemented with React.lazy()

#### C. Compress Assets
Enable gzip/brotli compression on server

### 6. Long Main-Thread Tasks (6 tasks)

**Problem**: JavaScript blocking main thread
**Solutions**:

#### A. Debounce Heavy Operations
```js
// Use debounce for search/filter operations
import { useMemo } from 'react';

const filteredProjects = useMemo(() => 
  activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter),
  [projects, activeFilter]
);
```

#### B. Virtualize Long Lists
For admin tables with many items:
```bash
npm install react-window
```

#### C. Web Workers for Heavy Computation
Move data processing to Web Workers if needed

### 7. User Timing Marks (2 timings)

**Already implemented** - PerformanceMonitor component tracking metrics

### 8. Non-Composited Animations (1 element)

**Problem**: Animation not GPU-accelerated
**Solution**: Use transform/opacity only

```css
/* Bad - triggers layout */
.animate {
  animation: slide 1s;
}
@keyframes slide {
  from { left: 0; }
  to { left: 100px; }
}

/* Good - GPU accelerated */
.animate {
  animation: slide 1s;
}
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

Check all animations use only:
- `transform`
- `opacity`
- `filter` (with caution)

## Quick Wins (Implement First)

### 1. Add Image Dimensions
Run this script to find all images without dimensions:
```bash
grep -r "<img" src/ | grep -v "width=" | grep -v "height="
```

### 2. Enable Production Build
```bash
npm run build
npm run preview
```

### 3. Analyze Bundle
```bash
npm install -D rollup-plugin-visualizer
```

Add to vite.config.js:
```js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true })
  ]
}
```

### 4. Remove Console Logs
Already configured in terser options

### 5. Optimize Fonts
Already done - reduced to 4 weights

## Expected Results

After implementing all optimizations:
- **Performance**: 59 → 85+
- **Bundle Size**: -340 KiB
- **Network Payload**: 9 MB → 3-4 MB
- **Main Thread**: Reduced blocking time

## Monitoring

Use Lighthouse CI for continuous monitoring:
```bash
npm install -g @lhci/cli
lhci autorun
```

## Priority Order

1. ✅ Font optimization (DONE)
2. ✅ Defer Google Translate (DONE)
3. 🔄 Add image dimensions (IN PROGRESS)
4. 🔄 Enable production build optimizations
5. 🔄 Image compression/WebP conversion
6. 🔄 Code splitting optimization
7. 🔄 Animation optimization

## Files to Update

1. `vite.config.js` - Build optimizations
2. `Portfolio.jsx` - Image dimensions
3. `Academy.jsx` - Image dimensions
4. `Home.jsx` - Image dimensions
5. All animation CSS - Use transform/opacity only

## Testing

After each change, test with:
```bash
npm run build
npm run preview
# Then run Lighthouse on localhost:4173
```

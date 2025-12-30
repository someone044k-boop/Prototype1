import React from 'react';

// Grid container variants
type ContainerVariant = 'default' | 'narrow' | 'wide';

// Grid layout variants
type GridVariant = 
  | 'auto-fit'      // Cards expand to fill space
  | 'auto-fill'     // Maintains minimum card size
  | 'cards'         // 1-2-3-4 columns responsive
  | 'split'         // Two equal columns
  | 'thirds'        // Three equal columns
  | 'sidebar'       // Sidebar + content
  | 'sidebar-right' // Content + sidebar
  | 'featured'      // Large item + smaller items
  | 'masonry';      // CSS columns masonry

// Gap sizes
type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface GridContainerProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
  style?: React.CSSProperties;
}

interface GridProps {
  children: React.ReactNode;
  variant?: GridVariant;
  gap?: GapSize;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  style?: React.CSSProperties;
}

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 'full';
  rowSpan?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}

// Container component - wraps content with max-width and padding
export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  variant = 'default',
  className = '',
  style
}) => {
  const variantClass = {
    default: 'grid-container',
    narrow: 'grid-container grid-container-narrow',
    wide: 'grid-container grid-container-wide'
  }[variant];

  return (
    <div className={`${variantClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

// Grid component - creates responsive grid layouts
export const Grid: React.FC<GridProps> = ({
  children,
  variant = 'auto-fit',
  gap = 'lg',
  cols,
  className = '',
  style
}) => {
  const variantClass = {
    'auto-fit': 'grid-auto-fit',
    'auto-fill': 'grid-auto-fill',
    'cards': 'card-grid',
    'split': 'grid-split',
    'thirds': 'grid-thirds',
    'sidebar': 'grid-sidebar',
    'sidebar-right': 'grid-sidebar grid-sidebar-right',
    'featured': 'grid-featured',
    'masonry': 'grid-masonry'
  }[variant];

  const gapClass = `gap-${gap}`;
  const colsClass = cols ? `grid-cols-${cols}` : '';

  // For masonry, we don't use display: grid
  if (variant === 'masonry') {
    return (
      <div className={`${variantClass} ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`grid ${cols ? colsClass : variantClass} ${gapClass} ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};

// Grid item component - for spanning multiple columns/rows
export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan,
  rowSpan,
  className = '',
  style
}) => {
  const colSpanClass = colSpan ? `col-span-${colSpan}` : '';
  const rowSpanClass = rowSpan ? `row-span-${rowSpan}` : '';

  return (
    <div className={`${colSpanClass} ${rowSpanClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

// Section component - adds consistent vertical spacing
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  style,
  id
}) => {
  return (
    <section id={id} className={`section-spacing ${className}`} style={style}>
      {children}
    </section>
  );
};

// Page wrapper - adds top padding for fixed header
interface PageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Page: React.FC<PageProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={`page-top min-h-screen ${className}`} style={style}>
      {children}
    </div>
  );
};

export default { GridContainer, Grid, GridItem, Section, Page };

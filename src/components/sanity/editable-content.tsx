'use client'

import { ReactNode } from 'react'

interface EditableContentProps {
  children: ReactNode
  documentId?: string
  documentType?: string
  fieldPath?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Wrapper component that makes content editable in Sanity Visual Editing mode
 * In production, it just renders the children normally
 * In development with visual editing, it adds data attributes for Sanity to detect
 */
export const EditableContent = ({
  children, 
  documentId, 
  documentType, 
  fieldPath,
  className,
  style 
}: EditableContentProps) => {
  // In development, add data attributes for visual editing
  const editableProps = process.env.NODE_ENV === 'development' && documentId && documentType ? {
    'data-sanity-edit-target': true,
    'data-sanity-document-id': documentId,
    'data-sanity-document-type': documentType,
    'data-sanity-field-path': fieldPath || '',
  } : {}

  return (
    <div 
      className={className}
      style={style}
      {...editableProps}
    >
      {children}
    </div>
  );
};

/**
 * Editable text component for simple text fields
 */
interface EditableTextProps {
  text: string
  documentId?: string
  documentType?: string
  fieldPath?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  style?: React.CSSProperties
}

export const EditableText = ({
  text, 
  documentId, 
  documentType, 
  fieldPath,
  as: Component = 'div',
  className,
  style 
}: EditableTextProps) => {
  const editableProps = process.env.NODE_ENV === 'development' && documentId && documentType ? {
    'data-sanity-edit-target': true,
    'data-sanity-document-id': documentId,
    'data-sanity-document-type': documentType,
    'data-sanity-field-path': fieldPath || '',
  } : {}

  return (
    <Component 
      className={className}
      style={style}
      {...editableProps}
    >
      {text}
    </Component>
  );
};

/**
 * Editable image component
 */
interface EditableImageProps {
  src: string
  alt: string
  documentId?: string
  documentType?: string
  fieldPath?: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

export const EditableImage = ({
  src, 
  alt, 
  documentId, 
  documentType, 
  fieldPath,
  className,
  style,
  width,
  height 
}: EditableImageProps) => {
  const editableProps = process.env.NODE_ENV === 'development' && documentId && documentType ? {
    'data-sanity-edit-target': true,
    'data-sanity-document-id': documentId,
    'data-sanity-document-type': documentType,
    'data-sanity-field-path': fieldPath || '',
  } : {}

  return (
    <div {...editableProps}>
      <img 
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
      />
    </div>
  );
};

'use client';

import { ReactNode } from 'react';

interface VisualEditingWrapperProps {
  children: ReactNode;
  documentId?: string;
  documentType?: string;
  fieldPath?: string;
  className?: string;
}

/**
 * Client component wrapper for visual editing in server components
 * This component can be used to wrap server-rendered content with visual editing capabilities
 */
export function VisualEditingWrapper({
  children,
  documentId,
  documentType,
  fieldPath,
  className,
}: VisualEditingWrapperProps) {
  // Add visual editing attributes when document info is available
  // This enables editing in both development and presentation mode
  const editableProps = documentId && documentType ? {
    'data-sanity-edit-target': true,
    'data-sanity-document-id': documentId,
    'data-sanity-document-type': documentType,
    'data-sanity-field-path': fieldPath || '',
  } : {};

  return (
    <div className={className} {...editableProps}>
      {children}
    </div>
  );
}

/**
 * Higher-order component for adding visual editing to server components
 */
export function withVisualEditing<T extends object>(
  Component: React.ComponentType<T>,
  documentType: string,
  fieldPath?: string
) {
  return function VisualEditingComponent(props: T & { documentId?: string; className?: string }) {
    const { documentId, className, ...componentProps } = props;
    
    return (
      <VisualEditingWrapper
        documentId={documentId}
        documentType={documentType}
        fieldPath={fieldPath}
        className={className}
      >
        <Component {...(componentProps as T)} />
      </VisualEditingWrapper>
    );
  };
}

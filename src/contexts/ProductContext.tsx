import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface ProductContextType {
  productDetails: ProductDetails | null;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails | null>>;
}

// Define the shape of our product details
interface ProductDetails {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Props for our provider component
interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('SELECTED_DESTINATION');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  
  return (
    <ProductContext.Provider value={{ productDetails, setProductDetails }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext(): ProductContextType {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}
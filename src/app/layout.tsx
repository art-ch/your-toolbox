import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Base RootLayout component that serves as the outermost layout wrapper.
 *
 * Note: This is not the functional root layout for the application.
 * The actual root layout with internationalization settings is implemented
 * in the [lng] directory layout, which wraps content with language providers.
 *
 * @param {RootLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}

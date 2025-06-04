/**
 * Root page component that serves as a fallback/default route.
 *
 * This component is not meant to be rendered directly. The application's
 * middleware intercepts requests to the root route and redirects them
 * to the appropriate language-specific routes based on user preferences
 * or defaults.
 *
 * @returns {null} - Returns null as this component should never render
 */
export default function RootPage(): null {
  return null;
}

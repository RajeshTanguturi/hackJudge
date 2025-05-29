const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated, userRole } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;



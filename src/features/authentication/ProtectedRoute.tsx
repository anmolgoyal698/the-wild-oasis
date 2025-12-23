import styled from "styled-components";
import { useAuth } from "./useAuth";
import Spinner from "../../ui/Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
  //1. Load the authenticated user
  const { isAuthenticated, isPending } = useAuth();

  //2. While loading, show spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //3. If no user, redirect to login
  if (!isAuthenticated && !isPending) {
    return <Navigate to="/login" replace />;
  }

  //4. If user, render children
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;

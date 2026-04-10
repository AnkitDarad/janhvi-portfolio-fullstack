import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

export const useAccessibleProjects = () => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    api.getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const canAccessProject = useCallback(
    (projectId) => projects.some((p) => p.id === projectId),
    [projects]
  );

  const getProject = useCallback(
    (projectId) => projects.find((p) => p.id === parseInt(projectId)),
    [projects]
  );

  return { accessibleProjects: projects, canAccessProject, getProject, loading };
};

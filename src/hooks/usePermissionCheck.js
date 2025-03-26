import { useAuthContext } from './useAuthContext';

const usePermissionCheck = (pageId = '') => {
  const { user } = useAuthContext();
  const modulePermissions = user?.data?.roles?.modulePermissions || [];

  const targetModule = modulePermissions.find((module) => module.module.name === pageId);

  const isCreateAllowed = targetModule?.actions?.create || false;
  const isReadAllowed = targetModule?.actions?.read || false;
  const isUpdateAllowed = targetModule?.actions?.update || false;
  const isDeleteAllowed = targetModule?.actions?.delete || false;

  return {
    isCreateAllowed,
    isReadAllowed,
    isUpdateAllowed,
    isDeleteAllowed,
    user: user?.data,
  };
};

export default usePermissionCheck;

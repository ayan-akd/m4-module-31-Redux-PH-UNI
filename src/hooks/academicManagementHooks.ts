/* eslint-disable @typescript-eslint/no-explicit-any */
import { academicManagementApiInstance } from "@/redux/features/admin/Academic Management/academicManagement.api";

const generateHooks = (api: any) => {
  const hooks: Record<string, any> = {};
  Object.keys(api.endpoints).forEach((endpoint) => {
    const hookName = `use${endpoint.charAt(0).toUpperCase()}${endpoint.slice(
      1
    )}Query`;
    const mutationHookName = `use${endpoint
      .charAt(0)
      .toUpperCase()}${endpoint.slice(1)}Mutation`;

    if (api[hookName]) hooks[hookName] = api[hookName];
    if (api[mutationHookName]) hooks[mutationHookName] = api[mutationHookName];
  });
  return hooks;
};

export const academicManagementHooks = generateHooks(
  academicManagementApiInstance
);

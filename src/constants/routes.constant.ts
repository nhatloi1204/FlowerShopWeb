export const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/register',
    PROFILE: '/profile',
  },

  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    CUSTOMERS: '/admin/customers',
    PRODUCTS: '/admin/products',
    CATEGORIES: '/admin/categories',
    TAGS: '/admin/tags',
    ORDERS: '/admin/orders',
  },

  PUBLIC: {
    PRODUCTS: '/products',
  },
} as const

export const ADMIN_TITLES: Record<string, string> = {
  [ROUTES.ADMIN.DASHBOARD]: 'Dashboard',
  [ROUTES.ADMIN.PRODUCTS]: 'Product management',
  [ROUTES.ADMIN.CATEGORIES]: 'Category management',
  [ROUTES.ADMIN.TAGS]: 'Tag management',
  [ROUTES.ADMIN.CUSTOMERS]: 'Customer management',
  [ROUTES.ADMIN.ORDERS]: 'Order management',
  [ROUTES.ADMIN.USERS]: 'User management',
  [ROUTES.ADMIN.ROLES]: 'Role & Permission management',
}

export const PATH_KEYS = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  ROLES: 'roles',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  ORDERS: 'orders',
} as const

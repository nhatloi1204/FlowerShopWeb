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
    PRODUCTS: {
      INDEX: '/admin/products',
      CREATE: '/admin/products/create',
      EDIT: '/admin/products/edit',
    },
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
  [ROUTES.ADMIN.CATEGORIES]: 'Category management',
  [ROUTES.ADMIN.TAGS]: 'Tag management',
  [ROUTES.ADMIN.CUSTOMERS]: 'Customer management',
  [ROUTES.ADMIN.ORDERS]: 'Order management',
  [ROUTES.ADMIN.USERS]: 'User management',
  [ROUTES.ADMIN.ROLES]: 'Role & Permission management',
  [ROUTES.ADMIN.PRODUCTS.INDEX]: 'Product management',
  [ROUTES.ADMIN.PRODUCTS.CREATE]: 'Create product',
  [ROUTES.ADMIN.PRODUCTS.EDIT]: 'Edit product',
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

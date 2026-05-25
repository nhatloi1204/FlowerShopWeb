export const ROUTES = {
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
    HOME: '/',
    SHOP: '/shop',
    BLOG: '/blog',
    ABOUT: '/about',
    CONTACT: '/contact',
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

export const PUBLIC_TITLES: Record<string, string> = {
  [ROUTES.PUBLIC.HOME]: 'Home',
  [ROUTES.PUBLIC.SHOP]: 'Shop',
  [ROUTES.PUBLIC.BLOG]: 'Blog',
  [ROUTES.PUBLIC.ABOUT]: 'About us',
  [ROUTES.PUBLIC.CONTACT]: 'Contact us',
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

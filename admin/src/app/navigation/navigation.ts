import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        icon: 'all_out',
        url: '/admin/categories',
      },
      {
        id: 'books',
        title: 'Books',
        type: 'item',
        icon: 'all_out',
        url: '/admin/books',
      },
      {
        id: 'meta',
        title: 'Meta',
        translate: 'NAV.META',
        type: 'item',
        icon: 'all_out',
        url: '/admin/meta',
      },
    ]
  }

];

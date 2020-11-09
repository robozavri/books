import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
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

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Anasayfa',
    url: '/anasayfa',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Ürünler',
    title: true,
    attributes: {
      filter: (item: INavData) => {
        // Sadece öğenin adı "Login" olan alt öğeyi göstermek için bir koşul belirtiyoruz
        return item.name === 'Login';
      }
    }
  },
  {
    name: 'Siparis ver',
    url: '/siparis-ver',
    iconComponent: { name: 'cil-puzzle' },
    attributes: {
      filter: (item: INavData) => {
        // Sadece öğenin adı "Login" olan alt öğeyi göstermek için bir koşul belirtiyoruz
        return item.name === 'Login';
      }
    }
  },
  {
    name: 'Widgets',
    url: '/siparis-ver/calendar',
    iconComponent: { name: 'cil-calculator' },

  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
        
      }
    ]

  },
];

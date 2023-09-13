import { JwtHelperService } from '@auth0/angular-jwt';
import { INavData } from '@coreui/angular';
import { Role } from '../../enums/roleEnum';
import { DefaultHeaderService } from './default-header/default-header.service';
const defaultHeaderService = new DefaultHeaderService();
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
      hidden:defaultHeaderService.hiddenForUser()
      
    }
  },
  {
    name: 'rezervasyon yap',
    url: '/siparis-ver',
    iconComponent: { name: 'cil-calendar' },
    attributes: {
      hidden:defaultHeaderService.hiddenForUser(),
      disabled:defaultHeaderService.disabledForUser()
    }

  },
  {
    name: 'Yönetici Ayarları',
    title: true,
    attributes: {
      hidden:defaultHeaderService.hiddenForAdmin(),

    }
  },
  {
    name: 'Kayıt isteklerini incele',
    url: '/admin/register-requests',
    iconComponent: { name: 'cil-search' },
    attributes: {
      hidden:defaultHeaderService.hiddenForAdmin(),

    }
  },
  {
    name: 'Rezervasyon istekleri',
    url: '/admin/reservation-requests',
    iconComponent: { name: 'cil-book' },
    attributes: {
      hidden:defaultHeaderService.hiddenForAdmin(),

    }
  },
  {
    name: 'Yeni cihaz ekle',
    url: '/admin/add-new-device',
    iconComponent: { name: 'cil-plus' },
    attributes: {
      hidden:defaultHeaderService.hiddenForAdmin(),

    }
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


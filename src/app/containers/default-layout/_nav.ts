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
    url: defaultHeaderService.route(),
    iconComponent: { name: 'cil-calendar' },
    attributes: {
      hidden:defaultHeaderService.hiddenForUser(),
    }

  },
  {
    name: 'rezervasyonlarım',
    url: defaultHeaderService.routeRes(),
    iconComponent: { name: 'cil-calendar' },
    attributes: {
      hidden:defaultHeaderService.hiddenForUser(),
    }

  },

  {
    name: 'Ayarlar',
    title: true,
    attributes: {
      hidden:defaultHeaderService.hiddenForUser()
    }
  },
  {
    name: 'bilgilerimi güncelle',
    url: defaultHeaderService.routeOpt(),
    iconComponent: { name: 'cil-calendar' },
    attributes: {
      hidden:defaultHeaderService.hiddenForUser(),
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
    name: 'Kayıtlı kullanıcıları düzenle',
    url: '/admin/edit-registered-users',
    iconComponent: { name: 'cil-pencil' },
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

];


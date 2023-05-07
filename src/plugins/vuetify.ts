import 'vuetify/styles';

import { createVuetify } from 'vuetify';

import '@mdi/font/css/materialdesignicons.css';

import { aliases, mdi } from 'vuetify/iconsets/mdi';

import LasenaUnitedIcon from '../icons/LU.vue';
import DagadaRangersIcon from '../icons/DR.vue';
import RisingThundersIcon from '../icons/RT.vue';
import RainbowBoysIcon from '../icons/RB.vue';
import Khashiru94Icon from '../icons/K94.vue';
import BrickwallHadadIcon from '../icons/BWH.vue';
import EasdenFrydgelandIcon from '../icons/EF.vue';
import AlMoomoodIcon from '../icons/AM.vue';
import BinatoneFcIcon from '../icons/BFC.vue';
import GuttersbergUnitedIcon from '../icons/GU.vue';
import IvaniaBoysIcon from '../icons/IB.vue';
import LonenRaidUnited17Icon from '../icons/LRU17.vue';
import NewSimeoneMirrorsIcon from '../icons/NSM.vue';
import NorthernUnitedIcon from '../icons/NU.vue';
import SouthportRangersIcon from '../icons/SPR.vue';
import VendoorsteinAthleticIcon from '../icons/VAS.vue';
import ZanderDragonsIcon from '../icons/ZD.vue';
import AlShalakatIcon from '../icons/AS.vue';
import ACPhilamentia from '../icons/ACP.vue';
import RoyalPhilamentia from '../icons/RP.vue';
import CevivaChiefsIcon from '../icons/CHI.vue';
import CevivaTorrentsIcon from '../icons/CTR.vue';
import RedKnightsIcon from '../icons/RED.vue';
import PaceIcon from '../icons/PAC.vue';
import FeedheinTridentsIcon from '../icons/TRI.vue';
import FeedheinUnitedIcon from '../icons/FUN.vue';
import JacwinthTanksIcon from '../icons/JAC.vue';
import DominionUnitedIcon from '../icons/DOU.vue';
import KyteIcon from '../icons/KFZ.vue';
import GreenBlueIcon from '../icons/GBL.vue';
import SportoMiduIcon from '../icons/SPO.vue';
import GiantsIcon from '../icons/GFZ.vue';
import PooventUnitedIcon from '../icons/PUN.vue';
import DynamiteIcon from '../icons/DYN.vue';
import PorgreggeIcon from '../icons/PGS.vue';
import BlazeCityIcon from '../icons/BFZ.vue';
import FZPreggeIcon from '../icons/FZP.vue';
import BoruzziaPreggeIcon from '../icons/BPG.vue';
import SdevSandsIcon from '../icons/SDS.vue';
import StallionsIcon from '../icons/SFZ.vue';
import SunnyCityIcon from '../icons/SUN.vue';
import BatsIcon from '../icons/BAT.vue';
import NettsIcon from '../icons/NET.vue';
import StorrLokomotivIcon from '../icons/LKM.vue';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Misc
import { loadFonts } from './webfontloader';

await loadFonts();

/**
 * Vuetify Components
 *
 * Notice: This variable is used during development to load all components to speed up the display
 *         and to reduce the size during build.
 *
 * @see {@link https://vuetifyjs.com/en/labs/introduction/}
 */
const vuetifyComponents = import.meta.env.DEV
  ? {
      components: {
        components
      },
      directives
    }
  : {
      components: {
        components
      }
    };
const fsProTheme = {
  dark: false,
  colors: {
    primary: '#7535ed',
    accent: '#c23361',
    anchor: '#340f78'
  }
};

export default createVuetify({
  vuetifyComponents,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    },
    values: {
      LU: {
        component: LasenaUnitedIcon
      },
      DR: {
        component: DagadaRangersIcon
      },
      RT: {
        component: RisingThundersIcon
      },
      RB: {
        component: RainbowBoysIcon
      },
      K94: {
        component: Khashiru94Icon
      },
      BWH: {
        component: BrickwallHadadIcon
      },
      EF: {
        component: EasdenFrydgelandIcon
      },
      AM: {
        component: AlMoomoodIcon
      },
      BFC: {
        component: BinatoneFcIcon
      },
      GU: {
        component: GuttersbergUnitedIcon
      },
      IB: {
        component: IvaniaBoysIcon
      },
      LRU17: {
        component: LonenRaidUnited17Icon
      },
      NSM: {
        component: NewSimeoneMirrorsIcon
      },
      NU: {
        component: NorthernUnitedIcon
      },
      SPR: {
        component: SouthportRangersIcon
      },
      VAS: {
        component: VendoorsteinAthleticIcon
      },
      ZD: {
        component: ZanderDragonsIcon
      },
      AS: {
        component: AlShalakatIcon
      },
      ACP: {
        component: ACPhilamentia
      },
      RP: {
        component: RoyalPhilamentia
      },
      CHI: {
        component: CevivaChiefsIcon
      },
      CTR: {
        component: CevivaTorrentsIcon
      },
      RED: {
        component: RedKnightsIcon
      },
      PAC: {
        component: PaceIcon
      },
      TRI: {
        component: FeedheinTridentsIcon
      },
      FUN: {
        component: FeedheinUnitedIcon
      },
      JAC: {
        component: JacwinthTanksIcon
      },
      DOU: {
        component: DominionUnitedIcon
      },
      KFZ: {
        component: KyteIcon
      },
      GBL: {
        component: GreenBlueIcon
      },
      SPO: {
        component: SportoMiduIcon
      },
      GFZ: {
        component: GiantsIcon
      },
      PUN: {
        component: PooventUnitedIcon
      },
      DYN: {
        component: DynamiteIcon
      },
      PGS: {
        component: PorgreggeIcon
      },
      BFZ: {
        component: BlazeCityIcon
      },
      FZP: {
        component: FZPreggeIcon
      },
      BPG: {
        component: BoruzziaPreggeIcon
      },
      SDS: {
        component: SdevSandsIcon
      },
      SFZ: {
        component: StallionsIcon
      },
      SUN: {
        component: SunnyCityIcon
      },
      BAT: {
        component: BatsIcon
      },
      NET: {
        component: NettsIcon
      },
      LKM: {
        component: StorrLokomotivIcon
      }
    }
  },

  theme: {
    defaultTheme: 'fsProTheme',
    themes: {
      fsProTheme
    }
  }
});

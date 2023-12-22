import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Perfil',
    path: '/MedicPanel',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Turnos pendientes',
    path: '/MedicShift',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Historial de turnos',
    path: '/MedicOldShift',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  }
];
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type DashboardIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const DashboardIcon = ({ ...props }: DashboardIconProps): ReactNode => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.73333 1.65859L3.66623 1.65855C3.36163 1.65826 3.09905 1.65801 2.86644 1.71386C2.13515 1.88942 1.56416 2.4604 1.3886 3.1917C1.33275 3.42431 1.333 3.68688 1.33329 3.99148L1.33333 4.05859V7.25859L1.33329 7.3257C1.333 7.6303 1.33275 7.89288 1.3886 8.12548C1.56416 8.85678 2.13515 9.42776 2.86644 9.60334C3.09905 9.65918 3.36163 9.65892 3.66623 9.65863L3.73333 9.65859H6.93333L7.00044 9.65863C7.30504 9.65892 7.56763 9.65918 7.80023 9.60334C8.53152 9.42776 9.10251 8.85678 9.27808 8.12548C9.33392 7.89288 9.33367 7.6303 9.33337 7.3257L9.33333 7.25859V4.05859L9.33337 3.99148C9.33367 3.68688 9.33392 3.42431 9.27808 3.1917C9.10251 2.4604 8.53152 1.88942 7.80023 1.71386C7.56763 1.65801 7.30504 1.65826 7.00044 1.65855L6.93333 1.65859H3.73333ZM3.17771 3.01035C3.23509 2.99656 3.32296 2.99192 3.73333 2.99192H6.93333C7.34372 2.99192 7.43159 2.99656 7.48896 3.01035C7.73273 3.06887 7.92305 3.25919 7.98159 3.50296C7.99536 3.56035 8 3.64822 8 4.05859V7.25859C8 7.66898 7.99536 7.75684 7.98159 7.81422C7.92305 8.05799 7.73273 8.24831 7.48896 8.30684C7.43159 8.32062 7.34372 8.32526 6.93333 8.32526H3.73333C3.32296 8.32526 3.23509 8.32062 3.17771 8.30684C2.93393 8.24831 2.74361 8.05799 2.68509 7.81422C2.67131 7.75684 2.66667 7.66898 2.66667 7.25859V4.05859C2.66667 3.64822 2.67131 3.56035 2.68509 3.50296C2.74361 3.25919 2.93393 3.06887 3.17771 3.01035ZM13.0667 1.65859L12.9996 1.65855C12.695 1.65826 12.4324 1.65801 12.1998 1.71386C11.4685 1.88942 10.8975 2.4604 10.7219 3.1917C10.6661 3.42431 10.6663 3.68688 10.6666 3.99148L10.6667 4.05859V7.25859L10.6666 7.3257C10.6663 7.6303 10.6661 7.89288 10.7219 8.12548C10.8975 8.85678 11.4685 9.42776 12.1998 9.60334C12.4324 9.65918 12.695 9.65892 12.9996 9.65863L13.0667 9.65859H16.2667L16.3337 9.65863C16.6384 9.65892 16.9009 9.65918 17.1336 9.60334C17.8648 9.42776 18.4359 8.85678 18.6115 8.12548C18.6672 7.89288 18.6671 7.6303 18.6667 7.3257V7.25859V4.05859V3.99148C18.6671 3.68688 18.6672 3.42431 18.6115 3.1917C18.4359 2.4604 17.8648 1.88942 17.1336 1.71386C16.9009 1.65801 16.6384 1.65826 16.3337 1.65855L16.2667 1.65859H13.0667ZM12.511 3.01035C12.5684 2.99656 12.6563 2.99192 13.0667 2.99192H16.2667C16.6771 2.99192 16.7649 2.99656 16.8223 3.01035C17.066 3.06887 17.2564 3.25919 17.3149 3.50296C17.3287 3.56035 17.3333 3.64822 17.3333 4.05859V7.25859C17.3333 7.66898 17.3287 7.75684 17.3149 7.81422C17.2564 8.05799 17.066 8.24831 16.8223 8.30684C16.7649 8.32062 16.6771 8.32526 16.2667 8.32526H13.0667C12.6563 8.32526 12.5684 8.32062 12.511 8.30684C12.2673 8.24831 12.0769 8.05799 12.0184 7.81422C12.0046 7.75684 12 7.66898 12 7.25859V4.05859C12 3.64822 12.0046 3.56035 12.0184 3.50296C12.0769 3.25919 12.2673 3.06887 12.511 3.01035ZM3.66623 10.9919L3.73333 10.9919H6.93333L7.00044 10.9919C7.30504 10.9916 7.56763 10.9913 7.80023 11.0472C8.53152 11.2227 9.10251 11.7937 9.27808 12.525C9.33392 12.7576 9.33367 13.0202 9.33337 13.3248L9.33333 13.3919V16.5919L9.33337 16.659C9.33367 16.9637 9.33392 17.2262 9.27808 17.4589C9.10251 18.1901 8.53152 18.7611 7.80023 18.9367C7.56763 18.9925 7.30504 18.9923 7.00044 18.9919H6.93333H3.73333H3.66623C3.36163 18.9923 3.09905 18.9925 2.86644 18.9367C2.13515 18.7611 1.56416 18.1901 1.3886 17.4589C1.33275 17.2262 1.333 16.9637 1.33329 16.659L1.33333 16.5919V13.3919L1.33329 13.3248C1.333 13.0202 1.33275 12.7576 1.3886 12.525C1.56416 11.7937 2.13515 11.2227 2.86644 11.0472C3.09905 10.9913 3.36163 10.9916 3.66623 10.9919ZM3.73333 12.3253C3.32296 12.3253 3.23509 12.3299 3.17771 12.3437C2.93393 12.4022 2.74361 12.5925 2.68509 12.8363C2.67131 12.8937 2.66667 12.9816 2.66667 13.3919V16.5919C2.66667 17.0023 2.67131 17.0902 2.68509 17.1475C2.74361 17.3913 2.93393 17.5817 3.17771 17.6402C3.23509 17.6539 3.32296 17.6586 3.73333 17.6586H6.93333C7.34372 17.6586 7.43159 17.6539 7.48896 17.6402C7.73273 17.5817 7.92305 17.3913 7.98159 17.1475C7.99536 17.0902 8 17.0023 8 16.5919V13.3919C8 12.9816 7.99536 12.8937 7.98159 12.8363C7.92305 12.5925 7.73273 12.4022 7.48896 12.3437C7.43159 12.3299 7.34372 12.3253 6.93333 12.3253H3.73333ZM13.0667 10.9919L12.9996 10.9919C12.695 10.9916 12.4324 10.9913 12.1998 11.0472C11.4685 11.2227 10.8975 11.7937 10.7219 12.525C10.6661 12.7576 10.6663 13.0202 10.6666 13.3248L10.6667 13.3919V16.5919L10.6666 16.659C10.6663 16.9637 10.6661 17.2262 10.7219 17.4589C10.8975 18.1901 11.4685 18.7611 12.1998 18.9367C12.4324 18.9925 12.695 18.9923 12.9996 18.9919H13.0667H16.2667H16.3337C16.6384 18.9923 16.9009 18.9925 17.1336 18.9367C17.8648 18.7611 18.4359 18.1901 18.6115 17.4589C18.6672 17.2262 18.6671 16.9637 18.6667 16.659V16.5919V13.3919V13.3248C18.6671 13.0202 18.6672 12.7576 18.6115 12.525C18.4359 11.7937 17.8648 11.2227 17.1336 11.0472C16.9009 10.9913 16.6384 10.9916 16.3337 10.9919L16.2667 10.9919H13.0667ZM12.511 12.3437C12.5684 12.3299 12.6563 12.3253 13.0667 12.3253H16.2667C16.6771 12.3253 16.7649 12.3299 16.8223 12.3437C17.066 12.4022 17.2564 12.5925 17.3149 12.8363C17.3287 12.8937 17.3333 12.9816 17.3333 13.3919V16.5919C17.3333 17.0023 17.3287 17.0902 17.3149 17.1475C17.2564 17.3913 17.066 17.5817 16.8223 17.6402C16.7649 17.6539 16.6771 17.6586 16.2667 17.6586H13.0667C12.6563 17.6586 12.5684 17.6539 12.511 17.6402C12.2673 17.5817 12.0769 17.3913 12.0184 17.1475C12.0046 17.0902 12 17.0023 12 16.5919V13.3919C12 12.9816 12.0046 12.8937 12.0184 12.8363C12.0769 12.5925 12.2673 12.4022 12.511 12.3437Z"
    />
  </svg>
);

import Swal from 'sweetalert2';
import { requestAdmin } from '../api/api';

export function login() {
  Swal.fire({
    title: 'Enter Administrator Password',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Login',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return requestAdmin(login)
        .then((response) => {
          if (!response) {
            throw new Error('Bad login');
          }
          return response;
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Logged in`,
      });
    }
  });
}

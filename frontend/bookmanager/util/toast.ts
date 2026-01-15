import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export function toastSuccess(title: string) {
  return Toast.fire({
    icon: 'success',
    title
  });
}

export function toastError(title: string) {
  return Toast.fire({
    icon: 'error',
    title
  });
}

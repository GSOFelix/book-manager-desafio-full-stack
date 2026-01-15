import Swal from 'sweetalert2';

export async function confirmDelete(
  message = 'Tem certeza que deseja excluir este item?'
): Promise<boolean> {
  const result = await Swal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33'
  });

  return result.isConfirmed;
}

export function successAlert(
  title = 'Sucesso',
  text = ''
) {
  return Swal.fire({
    title,
    text,
    icon: 'success'
  });
}

export function errorAlert(
  title = 'Erro',
  text = 'Algo deu errado'
) {
  return Swal.fire({
    title,
    text,
    icon: 'error'
  });
}
const rules = {
    full_name: {
        required: { value: true, message: 'Nama lengkap harus diisi.' },
        maxLength: { value: 255, message: 'Panjang nama lengkap maksimal 255 karakter.' }
    },
    email: {
        required: { value: true, message: 'Email harus diisi.' },
        maxLength: { value: 255, message: 'Panjang email maksimal 255 karakter.' },
        pattern: { value:  /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message: 'Email tidak valid.' }
    },
    password: {
        required: { value: true, message: 'Password tidak boleh kosong.' },
        minLength: { value: 6, message: 'Password minimal 6 karakter.'},
        maxLength: { value: 255, message: 'Panjang password maksimal 255 karakter.' }
    },
    password_confirmation: {
        required: { value: true, message: 'Konfirmasi tidak boleh kosong.' },
        minLength: { value: 6, message: 'Konfirmasi password minimal 6 karakter.'},
        maxLength: { value: 255, message: 'Panjang konfirmasi password maksimal 255 karakter.' }
    }
}

export { rules }
const selectImage = () => {
  if (!title.trim()) {
    alert('Vui lòng nhập tên phim trước khi chọn ảnh');
    return;
  }

  launchImageLibrary({ mediaType: 'photo' }, response => {
    if (response.assets && response.assets.length > 0) {
      const source = response.assets[0].uri;
      uploadImage(source, title);
    }
  });
};

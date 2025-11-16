<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ contact.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ contact.phone }}
    </div>
    <div class="p-1">
      <strong>Sở thích:</strong>
      {{ contact.hobby || "Chưa có" }}
    </div>
    <div class="p-1">
      <strong>Tình trạng hôn nhân:</strong>
      {{ contact.maritalStatus || "Chưa có" }}
    </div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-star text-warning"></i>
      <i v-else class="far fa-star text-secondary"></i>
    </div>
  </div>
</template>

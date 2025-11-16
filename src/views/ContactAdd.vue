<template>
  <div class="page">
    <h4>Thêm Liên hệ mới</h4>

    <ContactForm :contact="contact" @submit:contact="addContact" />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },

  data() {
    return {
      // contact rỗng dùng để nhập liệu
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        hobby: "",
        maritalStatus: "",
        favorite: false,
      },
    };
  },

  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert("Đã thêm liên hệ mới.");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

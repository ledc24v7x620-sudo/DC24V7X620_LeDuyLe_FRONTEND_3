<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema" :initial-values="initialContactValues">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="hobby">Sở thích</label>
      <Field
        name="hobby"
        type="text"
        class="form-control"
        placeholder="Nhập sở thích"
      />
      <ErrorMessage name="hobby" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="maritalStatus">Tình trạng hôn nhân</label>
      <Field
        name="maritalStatus"
        as="select"
        class="form-control"
      >
        <option value="">Chọn tình trạng</option>
        <option value="Độc thân">Độc thân</option>
        <option value="Đã kết hôn">Đã kết hôn</option>
        <option value="Ly dị">Ly dị</option>
        <option value="Góa">Góa</option>
      </Field>
      <ErrorMessage name="maritalStatus" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <Field
        name="favorite"
        type="checkbox"
        class="form-check-input"
        :value="true"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      hobby: yup.string().max(100, "Sở thích tối đa 100 ký tự."),
      maritalStatus: yup.string().max(50, "Tình trạng hôn nhân tối đa 50 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  computed: {
    // Đảm bảo initial values được format đúng cho vee-validate
    initialContactValues() {
      return {
        ...this.contact,
        favorite: this.contact.favorite === true || this.contact.favorite === "true"
      };
    },
  },
  methods: {
    submitContact(values) {
      // Vee-validate trả về values khi form submit
      // Xử lý favorite: checkbox trả về true/false hoặc undefined
      // Đảm bảo tất cả các trường được gửi, kể cả khi empty
      const contactData = {
        name: values.name || "",
        email: values.email || "",
        address: values.address || "",
        phone: values.phone || "",
        hobby: values.hobby !== undefined ? values.hobby : "",
        maritalStatus: values.maritalStatus !== undefined ? values.maritalStatus : "",
        favorite: values.favorite === true || values.favorite === "true"
      };
      this.$emit("submit:contact", contactData);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "You have unsaved changes! Do you want to leave?"
      );
      if (!reply) {
        // stay on the page if
        // user clicks 'Cancel'
        return false;
      } else this.$router.push({ name: "contactbook" });
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>

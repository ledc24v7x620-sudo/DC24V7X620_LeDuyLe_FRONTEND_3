<script>
export default {
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <i v-if="contact.favorite" class="fas fa-star text-warning mr-2"></i>
      <i v-else class="far fa-star text-secondary mr-2"></i>
      {{ contact.name }}
    </li>
  </ul>
</template>

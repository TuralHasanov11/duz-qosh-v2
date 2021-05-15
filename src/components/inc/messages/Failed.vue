<template>
  <b-alert
    :show="failed"
    dismissible
    variant="danger"
    @dismissed="dismissFail()"
    >{{ operationFailedMessage }}</b-alert
  >
</template>

<script>
export default {
  props: {
    failed: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    operationFailedMessage() {
      return this.$store.getters.operationFailedMessage;
    }
  },

  methods: {
    dismissFail() {
      this.$emit("dismissOperationFailed");
    }
  }
};
</script>

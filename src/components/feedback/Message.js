import React from "react";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "store/ducks/message.duck";

export default function Message() {
  const { message, open } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  return (
    <Modal visible={open}>
      <Card disabled>
        <Text>{message}</Text>
        <Button onPress={() => dispatch(actions.hideMessage())}>DISMISS</Button>
      </Card>
    </Modal>
  );
}

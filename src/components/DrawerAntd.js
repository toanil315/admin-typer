import React, { useState } from "react";
import { Drawer } from "antd";
import InputField from "./InputField";
import EditorTinyMCE from "./EditorTinyMCE";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_DRAWER } from "../redux/types/DrawerType";

export default function DrawerAntd() {
  const { visible } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({ type: HIDE_DRAWER });
  };

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
        width="65%"
      >
        <InputField title={"Title"} type="text" placeholder="Enter blog title" />
        <InputField title={"Banner Image"} type="text" placeholder="Enter blog title" />
        <InputField
          title={"Description"}
          typeComponent="text-area"
          type="text"
          placeholder="Enter blog title"
        />
        <EditorTinyMCE title="Body" />
      </Drawer>
    </div>
  );
}

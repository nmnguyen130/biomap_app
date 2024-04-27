import { useRef } from "react";
import { TextInput } from "react-native";

interface FormValues {
  scientificName?: string;
  name?: string;
  characteristic?: string;
  behavior?: string;
  habitat?: string;
}

const useFormInput = (initialValues?: FormValues) => {
  const scientificName = useRef(initialValues?.scientificName || "");
  const name = useRef(initialValues?.name || "");
  const characteristic = useRef(initialValues?.characteristic || "");
  const behavior = useRef(initialValues?.behavior || "");
  const habitat = useRef(initialValues?.habitat || "");

  const ScientificNameInput = (
    <TextInput
      className="text-gray-800"
      placeholder="Tên khoa học"
      defaultValue={scientificName.current}
      onChangeText={(value) => (scientificName.current = value)}
    />
  );

  const NameInput = (
    <TextInput
      className="text-gray-800"
      placeholder="Tên sinh vật"
      defaultValue={name.current}
      onChangeText={(value) => (name.current = value)}
    />
  );

  const CharacteristicInput = (
    <TextInput
      multiline
      className="w-11/12 text-gray-800"
      placeholder="Đặc điểm"
      defaultValue={characteristic.current}
      onChangeText={(value) => (characteristic.current = value)}
    />
  );

  const BehaviorInput = (
    <TextInput
      multiline
      className="w-11/12 text-gray-800"
      placeholder="Tập tính"
      defaultValue={behavior.current}
      onChangeText={(value) => (behavior.current = value)}
    />
  );

  const HabitatInput = (
    <TextInput
      multiline
      className="w-11/12 text-gray-800"
      placeholder="Môi trường sống"
      defaultValue={habitat.current}
      onChangeText={(value) => (habitat.current = value)}
    />
  );

  const getInputValues = () => {
    return {
      scientificName: scientificName.current,
      name: name.current,
      characteristic: characteristic.current,
      behavior: behavior.current,
      habitat: habitat.current,
    };
  };

  return {
    ScientificNameInput,
    NameInput,
    CharacteristicInput,
    BehaviorInput,
    HabitatInput,
    getInputValues,
  };
};

export default useFormInput;

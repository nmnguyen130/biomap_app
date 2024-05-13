import { useEffect, useState } from "react";
import { View } from "react-native";

import { getNumberFormWithStatus } from "@/api/FormApi";

import { FontText } from "../common";
import { ContributedList, CountBox } from "../contribute";

type Props = {
  onClose: () => void;
};

const FormManager = ({ onClose }: Props) => {
  const [counts, setCounts] = useState({ total: 0, approved: 0, pending: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [total, approved, pending] = await Promise.all([
          getNumberFormWithStatus(),
          getNumberFormWithStatus(undefined, "approved"),
          getNumberFormWithStatus(undefined, "pending"),
        ]);

        setCounts({
          total,
          approved,
          pending,
        });
      } catch (error) {
        console.error("Error fetching counts (admin):", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white mx-2">
      <FontText className="text-3xl text-center mb-2">
        Đóng góp của người dùng
      </FontText>

      <CountBox
        total={counts.total}
        approved={counts.approved}
        pending={counts.pending}
      />

      <ContributedList onCloseModal={onClose} />
    </View>
  );
};

export default FormManager;

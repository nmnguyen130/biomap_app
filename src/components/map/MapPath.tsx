import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { geoMercator, geoPath } from "d3-geo";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";

import { PROVINCES } from "@/constants/data/GeoPath";

const { height } = Dimensions.get("window");

const projection = geoMercator().fitExtent(
  [
    [0, 0],
    [height - 50, height + 10],
  ],
  {
    type: "FeatureCollection",
    features: PROVINCES,
  }
);

const provincePaths = PROVINCES.map(geoPath().projection(projection));

type Props = {
  width: number;
  height: number;
  showToast: (message: string) => void;
};

const MapPath: React.FC<Props> = ({ width, height, showToast }) => {
  const [pathList, setPathList] = useState<ReactElement[]>([]);
  const selectedPath = useRef<number>(-1);

  const handlePathTap = async (index: number) => {
    const provinceName = PROVINCES[index]?.properties?.Name_VI || "";
    setPathList((prevList) => {
      const newList = [...prevList];
      const prev = selectedPath.current;

      if (prev !== -1) {
        newList[prev] = React.cloneElement(newList[prev], {
          fill: "#ccc",
        });
      }

      newList[index] = React.cloneElement(prevList[index], { fill: "white" });
      selectedPath.current = index;

      return newList;
    });
    router.push(`(modals)/${provinceName}`);
  };

  const handlePathLongPress = async (index: number) => {
    showToast(PROVINCES[index].properties.Name_VI);
  };

  useEffect(() => {
    const paths = provincePaths.map((path: string, index: number) => {
      return (
        <Path
          key={index}
          d={path}
          fill={"#ccc"}
          stroke={"gray"}
          strokeWidth={0.8}
          onPress={() => handlePathTap(index)}
          onLongPress={() => handlePathLongPress(index)}
        />
      );
    });
    setPathList(paths);
  }, []);

  return (
    <Svg width={width} height={height}>
      {pathList}
    </Svg>
  );
};

export default MapPath;

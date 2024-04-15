import { feature } from "topojson-client";
import { GeometryCollection, Topology } from "topojson-specification";

import vietnam from "@assets/data/vn_simple.json";

export const PROVINCES = feature(
  vietnam as unknown as Topology,
  vietnam.objects.vn_iso_province as GeometryCollection
).features as any;

import { Text, View } from "@react-pdf/renderer";
import { css } from "../utils/styles";
import parse from "../utils/parse";

export interface MonthlyReportProps {
  proid: string;
  proname: string;
  complete: number;
  completedate: string;
  source: string | null;
  budget: number;
  month1: string;
  monthlyreport: string;
  status: "In-progress";
}

function MonthlyReport(
  props: MonthlyReportProps & { month: string; year: string },
) {
  return (
    <View style={css`border-black border-b  pb-2 mb-2 leading-normal`}>
      <Text style={css`font-bold text-lg`}>{props.proname}</Text>
      <View style={css`flex`}>
        <View style={css`inline`}>
          <Text style={css`font-bold`}>Project ID: </Text>
          <Text>{props.proid}</Text>
        </View>
        <View style={css`inline`}>
          <Text style={css`font-bold`}>Completion: </Text>
          <Text>{props.complete.toFixed(2)}%</Text>
        </View>
        <View style={css`inline`}>
          <Text style={css`font-bold`}>Status: </Text>
          <Text>{props.status}</Text>
        </View>
      </View>
      <Text style={css`font-bold`}>
        {props.month} {props.year}:
      </Text>
      <View style={{ marginLeft: 16 }}>{parse(props.monthlyreport)}</View>
    </View>
  );
}

export default MonthlyReport;

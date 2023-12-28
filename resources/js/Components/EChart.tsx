import { CSSProperties, useEffect, useRef } from "react";
import {
    init,
    type ECharts,
    getInstanceByDom,
    EChartsOption,
    SetOptionOpts,
} from "echarts";
import { cn } from "@/utils";

type Props = {
    option: EChartsOption;
    settings?: SetOptionOpts;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
};

export function Echart({ option, settings, loading, className, style }: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //initialize chart
        let chart: ECharts | undefined;
        if (chartRef.current !== null) {
            chart = init(chartRef.current);
        }

        // Resize listener
        function resizeChart() {
            chart?.resize();
        }
        window.addEventListener("resize", resizeChart);

        return () => {
            chart?.dispose();
            window.removeEventListener("resize", resizeChart);
        };
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart?.setOption(option, settings);
        }
    }, [option, settings]);

    useEffect(() => {
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            loading === true ? chart?.showLoading() : chart?.hideLoading();
        }
    }, [loading]);

    return (
        <div
            ref={chartRef}
            style={{ ...style, width: "100%" }}
            className={cn("text-textcolor", className)}
        />
    );
}

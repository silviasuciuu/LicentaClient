import React, {useContext} from "react";
import {IonApp, IonButton, IonInput, IonItem, IonLabel, IonPage} from "@ionic/react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import {RouteComponentProps} from "react-router";
import {getClientByIdd, getGreutatiById, modificaGreutate, salveazaGreutate} from "./EvolutieApi";
import {EvolutieContext, setId} from "./EvolutieProvider";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

interface EvolutiePropsExt extends RouteComponentProps<{
    id?: string;
}> {
}


const Evolutie: React.FC<EvolutiePropsExt> = ({history, match}) => {
    //@ts-ignore
    const routeId = history.location.state.id
    setId(routeId)
    const {greutati, fetching, fetchingError} = useContext(EvolutieContext);
    const dataSource = {
        data: [
            {label: "", value: ""},

        ],

        chart: {
            caption: "Evolutia greutatii",
            xAxisName: "Data",
            yAxisName: "Greutate",
            theme: "fusion"
        }
    };

    const handleAdaugaGreutate = async () => {

        var today: Date = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        console.log(routeId, 'routeidddd');
        // @ts-ignore
        var greutate = document.getElementById("greutate").value
        salveazaGreutate(routeId, greutate, yyyy + '-' + mm + '-' + dd)
        var inaltime, status
        await getClientByIdd(routeId).then(x => inaltime = (x[0].inaltime))
        // @ts-ignore
        let bmiCalc = greutate / (inaltime * inaltime) * 10000
        console.log(bmiCalc)
        if (bmiCalc == NaN)
            bmiCalc = 0
        if (bmiCalc < 18.5)
            status = 'Subponderal'
        if (bmiCalc <= 24.9 && bmiCalc >= 18.5)
            status = 'Normal'
        if (bmiCalc >= 25 && bmiCalc <= 29.9)
            status = 'Supraponderal'
        if (bmiCalc >= 30)
            status = 'Obez'
        console.log(status)

        // @ts-ignore
        modificaGreutate(routeId, greutate, bmiCalc, status)
        // history.goBack()
    };

    function convertDate(date: Date) {
        var day: string | number = date.getDate();
        day = day < 10 ? "0" + day : day;
        var month: string | number = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var year = date.getFullYear();
        console.log(day + "." + month + "." + year)
        return day + "." + month + "." + year;
    }

    // @ts-ignore
    for (let i = 0; i < greutati?.length; i++)
        if (greutati) {
            dataSource.data.push({
                label: convertDate(new Date(greutati[i].data)),
                value: greutati[i].greutate.toString()
            })
        }

    const chartConfigs = {
        type: "column2d",
        width: 600,
        height: 400,
        dataFormat: "json",
        dataSource: dataSource
    };

    return (
        <IonApp>
            <ReactFC {...chartConfigs} />
            <IonItem>
                <IonLabel>Adauga greutate</IonLabel>

                <IonInput
                    type="number"
                    // @ts-ignore
                    min={0}
                    id="greutate"
                >

                </IonInput>
            </IonItem>
            <IonButton onClick={handleAdaugaGreutate}>Adauga greutate</IonButton>
        </IonApp>
    );
};

export default Evolutie;
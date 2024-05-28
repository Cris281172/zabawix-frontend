import Active from "../promotions/active/Active";
import UnActive from "../promotions/unactive/Unactive";
import useTabs from "../../../hooks/useTabs";

const Orders = () => {
    const tabConfig = [
        {
            section_id: 'oczekujace',
            title: 'Oczekujące',
            components: <></>,
            visible: true
        },
        {
            section_id: 'w-trakcie-realizacji',
            title: 'W trakcie realizacji',
            components: <></>,
            visible: true
        },
        {
            section_id: 'wyslane',
            title: 'Wysłane',
            components: <></>,
            visible: true
        },
        {
            section_id: 'dostarczone',
            title: 'Dostarczone',
            components: <></>,
            visible: true
        },
        {
            section_id: 'zakonczone',
            title: 'Zakończone',
            components: <></>,
            visible: true
        },
        {
            section_id: 'zwrocone',
            title: 'Zwrócone',
            components: <></>,
            visible: true
        },
        {
            section_id: 'nieudane',
            title: 'Nieudane',
            components: <></>,
            visible: true
        },
        {
            section_id: 'oczekujace-na-platnosc',
            title: 'Oczekujące na płatność',
            components: <></>,
            visible: true
        },
    ]

    const { Tabs } = useTabs(tabConfig, 'aktywne');

    return(
        <>
            <Tabs />
        </>
    )
}

export default Orders;
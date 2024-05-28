import PersonalDataForm from "./form/PersonalDataForm";
import TopBarTitle from "../../top-bar-title/TopBarTitle";

const PersonalData = () => {
    return(
        <div>
            <TopBarTitle text="Dane osobowe" desc="Bla bla bla" />
            <PersonalDataForm />
        </div>
    )
}

export default PersonalData;
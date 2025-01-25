import BuisnessCard from "@/components/BusinessCard";
import Section from "@/components/Section";
import { faParachuteBox } from "@fortawesome/free-solid-svg-icons";

export default function Test() {


    return (
        <Section>

            {/* the function is: BuisnessCard({theme = "black", title, children, icons = faPaperclip}: Props) { 

            so this means theme has a default value of "black",and icons has a default value of faPaperclip


            The props are: 
            type Props = {
                theme?: string,
                title: string,
                children: React.ReactNode,
                icons?: IconDefinition
            }

            so title and children are required, and theme and icons are optional
            
            */}


            {/* default theme */}
            <BuisnessCard
                title={"Hello world"}
            >
                The main content of the card goes here
            </BuisnessCard>

            {/* changed theme and icon, so they are non-default */}
            <BuisnessCard
                title={"Hello world"}
                theme={"white"}
                icons={faParachuteBox}
            >
                The main content of the card goes here
            </BuisnessCard>
        </Section>

    )

}
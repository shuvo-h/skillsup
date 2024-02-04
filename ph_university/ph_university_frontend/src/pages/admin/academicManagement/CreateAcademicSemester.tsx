
import PHForm from '../../../components/form/PHForm';
import { FieldValues } from 'react-hook-form';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';


const CreateAcademicSemester = () => {
    const onSubmit = async(data:FieldValues) =>{
        console.log(data);
        const name = nameOptions[Number(data.name)-1].label;
        const semesterData = {
            name,
            code: data.name,
            year: data.year,
        };
        console.log(semesterData);
        
    }
    
    const currentYear = new Date().getFullYear();
    const yearOptions = [0,1,2,3,4].map(number =>({
        value: currentYear + number,
        label: String(currentYear + number),
    }))
    
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PHSelect defaultValue={semesterOptions[0].value} label='Name' name='name' options={semesterOptions} />
                    <PHSelect defaultValue={yearOptions[0].value} label='Year' name='year' options={yearOptions} />
                    <PHSelect defaultValue={monthOptions[0].value} label='Start Month' name='startMonth' options={monthOptions} />
                    <PHSelect defaultValue={monthOptions[0].value} label='End Month' name='endMonth' options={monthOptions} />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
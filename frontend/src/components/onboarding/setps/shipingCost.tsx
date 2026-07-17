import { Form, InputNumber } from "antd";
import {
    formatCurrency,
    parseCurrency,
} from "@/utils/formRules";
import { shippingCostRules } from "@/lib/validation/rules";

export default function ShippingStep() {
    return (
        <Form.Item
            preserve
            name="shipping_cost"
            label="هزینه ارسال ثابت"
            rules={shippingCostRules}
        >
            <InputNumber
                min={0}
                size="large"
                controls={false}
                className="w-full"
                addonAfter="تومان"
                parser={parseCurrency}
                formatter={formatCurrency}
            />
        </Form.Item>
    );
}
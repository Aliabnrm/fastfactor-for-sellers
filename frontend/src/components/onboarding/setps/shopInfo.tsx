import { Dispatch, SetStateAction } from "react";
import { Form, Input, Spin } from "antd";
import { Rule } from "antd/es/form";
import { shopNameRules } from "@/lib/validation/rules";

type Props = {
    slug: string;
    setSlug: Dispatch<SetStateAction<string>>;
    slugResult?: {
        available?: boolean;
    };
    isCheckingSlug: boolean;
};

export default function ShopInfoStep({
    setSlug,
    slugResult,
    isCheckingSlug,
}: Props) {
    const slugRules: Rule[] = [
        {
            required: true,
            message: "آدرس فروشگاه الزامی است.",
        },
        {
            validator: async (_, value) => {
                if (!value) {
                    return Promise.resolve();
                }

                if (isCheckingSlug) {
                    return Promise.resolve();
                }

                if (slugResult?.available) {
                    return Promise.resolve();
                }

                return Promise.reject(
                    new Error("این آدرس قبلاً رزرو شده است.")
                );
            },
        },
    ];

    return (
        <>
            <Form.Item
                name="shop_name"
                label="نام فروشگاه"
                rules={shopNameRules}
            >
                <Input
                    size="large"
                    placeholder="مثال: گالری مریم"
                />
            </Form.Item>

            <Form.Item
                name="slug"
                label="آدرس فروشگاه"
                rules={slugRules}
            >
                <Input
                    size="large"
                    addonBefore="myshop.ir/"
                    placeholder="maryam-gallery"
                    suffix={isCheckingSlug ? <Spin size="small" /> : null}
                    onChange={(e) => setSlug(e.target.value)}
                />
            </Form.Item>
        </>
    );
}
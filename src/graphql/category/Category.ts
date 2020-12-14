import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Category {

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    _id: string

}

export default Category
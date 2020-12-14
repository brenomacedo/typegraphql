import { Resolver, Query, Mutation, InputType, Arg, Field, Subscription, Ctx, PubSub, PubSubEngine, Root } from "type-graphql"
import Category from "./Category"
import CategorySchema from '../../model/CategorySchema'

@InputType()
class CategoryInput {

    @Field()
    description: string

    @Field()
    name: string

}

@Resolver(Category)
class CategoryResolver {

    @Query(() => [Category])
    async categories () {
        const categories = await CategorySchema.find()
        return categories
    }

    @Mutation(() => Category)
    async createCategory(@Arg('categoryInput') categoryInput: CategoryInput, @PubSub() pubsub: PubSubEngine) {
        const category = await CategorySchema.create<CategoryInput>(categoryInput)
        await pubsub.publish("CATEGORY", category)
        return category
    }

    @Subscription(() => Category, {
        topics: "CATEGORY",
        filter: ({ payload, args }) => {
            return (payload._doc.name !== 'entrar')
        }
    })
    newCategory(@Root() category: any) {
        const { name, description, _id } = category._doc
        
        return {
            description,
            name,
            _id
        }
    }

}

export default CategoryResolver
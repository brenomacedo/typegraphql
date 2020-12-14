import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql"
import Video from "./Video"
import VideoSchema from '../../model/VideoSchema'


@InputType()
class VideoInput {

    @Field()
    description: string

    @Field()
    name: string

    @Field()
    category: string

}

@Resolver(Video)
class VideoResolver {
     
    @Query(() => [Video])
    async videos() {
        const videos = await VideoSchema.find()
        return videos
    }

    @Mutation(() => Video)
    async createVideos(@Arg('videoInput') videoInput: VideoInput) {
        const video = await VideoSchema.create(videoInput as any)
        return video
    }

}

export default VideoResolver
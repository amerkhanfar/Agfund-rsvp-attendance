import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "526c633e5abd8c923fb27eeb88245c81-us21",
  server: "us21",
});

export async function getMailchimpMembers() {
  try {
    const audienceId = "12a63504d0"; // Replace with your audience ID
    const response = await mailchimp.lists.getListMembersInfo(audienceId);

    console.log(response.members);
  } catch (error) {
    console.error(error);
  }
}

getMailchimpMembers();

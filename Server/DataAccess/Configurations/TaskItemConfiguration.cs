using AppModels.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
            builder.Property(t => t.Description).HasMaxLength(2000);
            builder.Property(t => t.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            builder.HasOne(t => t.BoardList)
                .WithMany(l => l.Tasks)
                .HasForeignKey(t => t.BoardListId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
